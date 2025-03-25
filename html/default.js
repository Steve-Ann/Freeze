
            let form = document.getElementById("ordernumber");
            let label = document.createElement("label");
            label.innerHTML = "Order Number: ";
            label.setAttribute("for", "ordernumber")
            let input = document.createElement("input")
            input.type = "text";
            input.id = "namefield";
            input.name = "name";
            input.placeholder = "Order Number"
            input.required = true;
            let button = document.createElement("button");
            button.type = "submit";
            button.innerHTML = "submit";
            form.appenchild(label);
            form.appenchild(input);
            form.appendChild(document.createElement("br"));
            form.appendChild(button);
            form.addEventListener("submit", function(event) {
              event.preventDefault();
              alert("form submitted with: " + input.value);
            });


        