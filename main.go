package main

import (
	"html/template"
	"log"
	"net/http"
	"time"
)

var startTime time.Time

func uptime() time.Duration {
	return time.Since(startTime)
}

func init() {
	startTime = time.Now()
}

func main() {
	tmpl, err := template.New("Index").Parse(index)
	if err != nil {
		log.Fatal(err)
	}
	m := http.NewServeMux()
	m.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, struct{ Hours float64 }{Hours: uptime().Hours()})
	})

	s := &http.Server{
		Addr:    "localhost:8000",
		Handler: m,
	}
	log.Fatal(s.ListenAndServe())
}

var index = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HichuYamichu.me</title>
  </head>
  <body>
    <pre>
This is extremely professional website.
Don't believe me? Try viewing it with
curl or Invoke-WebRequest. Pretty
readable huh? Anyway, this page might
get reworked into some unprofessional
frameworked SPA PWA that doesn't work
half of the time. But for now enjoy
this nice uptime: {{.Hours}}h

Oh and checkout these subdomains:
	</pre>
    <a href="http://bot.hichuyamichu.me">bot.hichuyamichu.me</a>
  </body>
</html>
`
