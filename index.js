const { log } = require("console");
const fs = require("fs");
const { createServer } = require("http");
const url = require("url");

////////////// FILES //////////
// import { readFileSync } from "node:fs";

// const text = readFileSync("./txt/input.txt", "utf-8");
// console.log(text);

// <--for mjs-->
// Blocking , synchronous way

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on: ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("written");

// ?non-blocking asynchronous way

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("your file has been written 😀 ");
//       });
//     });
//   });
// });
// log("will read file");

//////////////////////////////
//SERVER

// const server = createServer((req, res) => {
//   const { query, pathname } = url.parse(req.url, true);

//   // Overview page
//   if (pathname === "/" || pathname === "/overview") {
//     res.writeHead(200, {
//       "Content-type": "text/html",
//     });

//     const cardsHtml = dataObj
//       .map((el) => replaceTemplate(tempCard, el))
//       .join("");
//     const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
//     res.end(output);

//     // Product page
//   } else if (pathname === "/product") {
//     res.writeHead(200, {
//       "Content-type": "text/html",
//     });
//     const product = dataObj[query.id];
//     const output = replaceTemplate(tempProduct, product);
//     res.end(output);

//     // API
//   } else if (pathname === "/api") {
//     res.writeHead(200, {
//       "Content-type": "application/json",
//     });
//     res.end(data);

//     // Not found
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>Page not found!</h1>");
//   }
// });

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = createServer((req, res) => {
  const pathname = req.url;
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<h1>This is the OVERVIEW</h1>");
  } else if (pathname === "/product") {
    res.end("This is the products");
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening.....");
});
