function FindProxyForURL(url, host) {
    if(shExpMatch(url, "*.google.com/*")){
        return "PROXY www-proxy.exu.ericsson.se:8080";
    }
    return "DIRECT";
} 
