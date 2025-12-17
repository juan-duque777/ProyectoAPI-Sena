
const express = require("express")


function anticache(req, resp, next){
    resp.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    resp.set('Pragma', 'no-cache');
    resp.set('Expires', '0');

    next();    
}

module.exports = anticache;