package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"golang.org/x/crypto/acme/autocert"
)

const (
	inProduction = false
	staticDir    = "./build/es5-bundled"
)

var domain = []string{"ditecmarineproducts.com/"}

// checkout form
func handleCheckout(w http.ResponseWriter, r *http.Request) {

	type account struct {
		AccountEmail string `json:"accountEmail"`
		AccountPhone string `json:"accountPhone"`
		ShipAddress  string `json:"shipAddress"`
		ShipCity     string `json:"shipCity"`
		ShipState    string `json:"shipState"`
		ShipZip      string `json:"shipZip"`
		ShipCountry  string `json:"shipCountry"`
		SetBilling   string `json:"setBilling"`
		CcName       string `json:"ccName"`
		CcNumber     string `json:"ccNumber"`
		CcExpMonth   string `json:"ccExpMonth"`
		CcExpYear    string `json:"ccExpYear"`
		CcCVV        string `json:"ccCVV"`
	}

	type cartItem struct {
		Name  string `json:"name"`
		Price int64  `json:"price"`
	}

	type cart struct {
		Item     cartItem `json:"item"`
		Quantity int      `json:"quantity"`
		Size     string   `json:"size"`
	}

	type checkout struct {
		Account account `json:"account"`
		Cart    []cart  `json:"cart"`
	}

	// Read body
	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Unmarshal
	c := checkout{}
	err = json.Unmarshal(b, &c)
	if err != nil {
		log.Println("error trying to Unmarshal body")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// enable cors
	enableCors(&w)

	log.Println("processing checkout form")
	log.Printf("checkout--> %v\n", c)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{ "success": 1, "successMessage": "Your order has been received." }`))
}

//qenable CORS in localhost for testing purposes
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

// Product Categories:  /api/categories
func handleCategories(w http.ResponseWriter, r *http.Request) {
	type category struct {
		Name        string `json:"name"`
		Title       string `json:"title"`
		Image       string `json:"image"`
		Placeholder string `json:"placeholder"`
	}
	categories := make(map[string]category)
	_path := "./data/categories.json"
	categoriesFile, err := os.Open(_path)
	defer categoriesFile.Close()
	if err != nil {
		log.Fatalf("could not open %s", _path)
	}
	jsonParser := json.NewDecoder(categoriesFile)
	err = jsonParser.Decode(&categories)
	if err != nil {
		log.Fatal("could not decode categories.json")
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categories)
	return
}

// implement categgorie items api:   /api/category/{categoryName}
func handleCategoryItems(w http.ResponseWriter, r *http.Request) {

	type items []struct {
		Name       string `json:"name"`
		Title      string `json:"title"`
		Category   string `json:"category"`
		Image      string `json:"image"`
		LargeImage string `json:"largeImage"`
		Sizes      []struct {
			Size  string `json:"size"`
			Price int64  `json:"price"`
		} `json:"sizes"`
		Price                       int64    `json:"price"`
		Size                        string   `json:"size"`
		Qty                         int64    `json:"qty"`
		Description                 string   `json:"description"`
		CostPerformance             []string `json:"costPerformance"`
		UseApplication              []string `json:"useApplication"`
		SuggestedDilutionDirections string   `json:"suggestedDilutionDirections"`
		Environment                 []string `json:"environment"`
		ProductSpecification        string   `json:"productSpecification"`
	}

	categoryName := strings.TrimPrefix(r.URL.Path, "/api/category/")
	itemsFile, err := os.Open("./data/" + categoryName + ".json")
	defer itemsFile.Close()
	if err != nil {
		log.Fatalf("could not open %s\n", itemsFile)
	}

	var _items items
	err = json.NewDecoder(itemsFile).Decode(&_items)
	if err != nil {
		log.Fatal("could not decode from itemsFile")
	}
	w.Header().Set("Content-Type", "application-json")
	json.NewEncoder(w).Encode(_items)
	return
}

type customFileServer struct {
	root            http.Dir
	NotFoundHandler func(http.ResponseWriter, *http.Request)
}

// implement the http.Handler interface for customFileServer struct
func (fs *customFileServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if containsDotDot(r.URL.Path) {
		http.Error(w, "URL should not contain '/../' parts", http.StatusBadRequest)
		return
	}
	//if empty, set current directory
	dir := string(fs.root)
	if dir == "" {
		dir = "."
	}

	//add prefix and clean
	upath := r.URL.Path
	if !strings.HasPrefix(upath, "/") {
		upath = "/" + upath
		r.URL.Path = upath
	}
	upath = path.Clean(upath)

	//path to file
	name := path.Join(dir, filepath.FromSlash(upath))

	//check if file exists
	f, err := os.Open(name)
	defer f.Close()
	if err != nil {
		if os.IsNotExist(err) {
			fs.NotFoundHandler(w, r)
			return
		}
	}

	http.ServeFile(w, r, name)

}

// CustomFileServer factory function
func CustomFileServer(root http.Dir, NotFoundHandler http.HandlerFunc) http.Handler {
	return &customFileServer{root: root, NotFoundHandler: NotFoundHandler}
}

//helper functions to guard against traversal attack
//looking for cases such as "../" in request URL
func containsDotDot(v string) bool {
	if !strings.Contains(v, "..") {
		return false
	}
	for _, ent := range strings.FieldsFunc(v, isSlashRune) {
		if ent == ".." {
			return true
		}
	}
	return false
}

func isSlashRune(r rune) bool { return r == '/' || r == '\\' }

func main() {
	serveIndexHTML := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, staticDir+"/index.html")
	}
	mux := http.NewServeMux()
	log.Printf("static directory is %s\n", staticDir)
	mux.Handle("/", CustomFileServer(http.Dir(staticDir), serveIndexHTML))
	mux.HandleFunc("/api/checkout", handleCheckout)
	mux.HandleFunc("/api/categories", handleCategories)
	mux.HandleFunc("/api/category/", handleCategoryItems)

	// inproduction false for local development
	if !inProduction {
		s := &http.Server{
			Addr:           ":8081",
			Handler:        mux,
			ReadTimeout:    5 * time.Second,
			WriteTimeout:   5 * time.Second,
			IdleTimeout:    120 * time.Second,
			MaxHeaderBytes: 1 << 20,
		}
		log.Println("Listening on port 8081...")
		log.Fatal(s.ListenAndServe())

	} else {
		m := &autocert.Manager{
			Cache:      autocert.DirCache("golang-autocert"),
			Prompt:     autocert.AcceptTOS,
			HostPolicy: autocert.HostWhitelist(domain...),
		}
		// HTTP Server
		go func() {
			log.Fatal(http.ListenAndServe(":http", m.HTTPHandler(mux)))
		}()
		// HTTPS Server
		log.Fatal(http.Serve(m.Listener(), mux))
	}

}
