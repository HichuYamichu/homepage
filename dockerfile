FROM golang:latest AS build

WORKDIR /build

ENV GO111MODULE=on

COPY go.mod ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o homepage ./cmd/homepage/main.go

FROM scratch

WORKDIR /app

COPY --from=build /build/homepage /app/

EXPOSE 3000

CMD ["./homepage", "-port=3000", "-host=0.0.0.0"]