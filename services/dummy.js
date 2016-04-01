module.exports = function (pubnub) {
  // Pubnub shit
  var message = {"hello": "world"};
  setInterval(function () {
    pubnub.publish({
      channel: "hello",
      message: message,
      callback: function (res) {
        console.log("=========== SUCCESS ============");
        console.log(res);
      },
      error: function (e) {
        console.log("====== Oops! ");
        console.error(e);
      }
    });
  }, 2000);  
};
