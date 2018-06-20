//DOM Selectors
const $go = $("#go"),
      $go2 = $("#go2"),
      $go3 = $("#go3");

//event listeners
$go.click(function(event) {
    event.preventDefault();
    $.get("/scrape", function(result){
        console.log(result);
    })
});

$go2.click(function(event) {
    $.get("/scrape-rng", function(result){
        console.log(result);
    })
});

$go3.click(function(event) {
    $.get("scrape-warcry", function(result){
        console.log(result);
    })
})

