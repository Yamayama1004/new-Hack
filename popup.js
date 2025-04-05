document.addEventListener("DOMContentLoaded", function () {
  const functionSettingForm = document.getElementById("function-setting");
  const function1CB = document.getElementById("function1");
  const function2CB = document.getElementById("function2");
  const function3CB = document.getElementById("function3");
  const function_l = ["function1s", "function2s"]

  chrome.storage.sync.get(function_l, function (data) {
    function1CB.checked = data.function1s !== undefined ? data.function1s : false;
    function2CB.checked = data.function2s !== undefined ? data.function2s : false;
    function3CB.checked = data.function3s !== undefined ? data.function
  });

  function1CB.addEventListener('change', function () {
    chrome.storage.sync.set({ "function1s": this.checked });
  });

  function2CB.addEventListener('change', function () {
    chrome.storage.sync.set({ "function2s": this.checked });
  });
});

