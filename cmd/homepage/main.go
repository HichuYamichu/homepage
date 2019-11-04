package main

import (
	"flag"
	"os"
	"os/signal"
	"syscall"

	"github.com/hichuyamichu-me/homepage/app"
)

var port = flag.String("port", "3000", "http service port")
var host = flag.String("host", "127.0.0.1", "http service host")

func main() {
	flag.Parse()
	srv := app.New(*host, *port)

	go func() {
		done := make(chan os.Signal, 1)
		signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
		<-done
		srv.Shutdown()
	}()

	srv.Run()
}
