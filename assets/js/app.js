function makeRequest() {
    $.ajax({
        url: "https://pullapi-s1.track360.co.in/api/v1/auth/pull_api?username=Atthahinfo&password=Abc@1234",
        type: "POST",
        // processData: false,
        // contentType: false,   
        // cache: false,
       // data: {},
        success: function (data) {
            t.attr("disabled", false);
            var obj = JSON.parse(data);
            if (obj.status == true) {
                console.log(data); 
            } else {
                fun_popup_message(obj.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('error:', error);
        }
    });
}

// setInterval(makeRequest, 3000); 
makeRequest()
