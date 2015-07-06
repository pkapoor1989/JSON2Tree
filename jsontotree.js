window.onload = function() {
    var submit = document.getElementById("json_submit");
    submit.addEventListener("click", function(event) {
        try {
            var jsonText = document.getElementById("json_text");
            var jsonError = document.getElementById('json_error');
            var jsonDiv = document.getElementById("json_render");
            var json = JSON.stringify(eval("(" + jsonText.value + ")"));
            var jsonValue = JSON.parse(json);

            jsonDiv.innerHTML = "";
            convertJSONToTree(jsonDiv, jsonValue,"");
            jsonText.className = "col-md-12";
            jsonError.className = "row col-md-7 col-md-offset-5 hidden"
        } catch (ex) {
            jsonText.className = "col-md-12 form-control";
            jsonError.className = "row col-md-7 col-md-offset-5"
            jsonDiv.innerHTML = "";
        }

    });
}

function convertJSONToTree(jsonDiv, jsonValue,path,type) {
	var array = true;
    if (typeof jsonValue === 'object') {
        if (jsonValue.constructor != Array) {
            var x = [];
            x.push(jsonValue);
            jsonValue = x;
            array = false
        }
    }
    var ul = document.createElement('ul');
    ul.className = "hidden uiTree";
    for (var i = 0; i < jsonValue.length; i++) {


        for (var key in jsonValue[i]) {
            var li = document.createElement('li');
            var anchor = document.createElement('a');
            var tmpPath = '';
            if (path == '') {
            	tmpPath +=key;
            } else {
            	if (!array ) {
            		tmpPath= path+"."+key
            	} else {
            		if (typeof jsonValue[i] !== 'object') {
            			tmpPath=path+"[" +i+"]";
            		} else {
            			tmpPath=path+"[" +i+"]."+key;
            		}
            		
            	}
            }
            
            (function (p) {
            	anchor.addEventListener("click", function(event) {
            		console.log(p);
                var target = event.currentTarget;
                var nextUL = target.nextElementSibling;
                if (nextUL) {
                    if (nextUL.className == 'hidden uiTree') {
                        nextUL.className = 'uiTree';
                        target.children[0].className = 'glyphicon glyphicon-chevron-down';
                        target
                    } else {
                        nextUL.className = 'hidden uiTree';
                        target.children[0].className = 'glyphicon glyphicon-chevron-right';
                    }
                }
            });
            })(tmpPath);

            var icon = document.createElement('i');
            var span = document.createElement('span');
            anchor.className = 'icon';
            icon.className = 'glyphicon glyphicon-chevron-right';
            anchor.appendChild(icon);

            if (typeof jsonValue[i][key] === 'object') {
                span.appendChild(document.createTextNode(key));
                anchor.appendChild(span);
                li.appendChild(anchor);
                convertJSONToTree(li, jsonValue[i][key],tmpPath);
            } else {
                var flag = false;
                if (typeof jsonValue[i] !== 'object') {
                    span.appendChild(document.createTextNode(jsonValue[i]));
                    flag = true;

                } else {
                    span.appendChild(document.createTextNode(key + ": " + jsonValue[i][key]));
                }

                anchor.appendChild(span);
                icon.className = '';
                li.appendChild(anchor);

            }

            ul.appendChild(li);
            if (flag) {
                break;
            }


        }


    }

    jsonDiv.appendChild(ul);



}
