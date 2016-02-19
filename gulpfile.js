/* jshint node: true */
"use strict";

var gulp = require("gulp");
var purescript = require("gulp-purescript");
var webpack = require("webpack-stream");

var sources = [
    "src/**/*.purs",
    "bower_components/purescript-*/src/**/*.purs"
];

var foreigns = [
    "src/**/*.js",
    "bower_components/purescript-*/src/**/*.js"
];

gulp.task("make", function() {
    return purescript.psc({ src: sources, ffi: foreigns });
});

gulp.task("prebundle", ["make"], function() {
    return purescript.pscBundle({
        src: "output/**/*.js",
        output: "dist/bob16.js",
        module: "Main",
        main: "Main"
    });
});

gulp.task("bundle", ["prebundle"], function () {
    return gulp.src("dist/bob16.js")
        .pipe(webpack({
            resolve: { modulesDirectories: ["node_modules"] },
            output: { filename: "bob16.js" }
        }))
        .pipe(gulp.dest("static"));
});

gulp.task("watch", function () {
    return gulp.watch(sources.concat(foreigns), ["bundle"]);
});

gulp.task("default", ["bundle"]);
