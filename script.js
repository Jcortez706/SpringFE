"use strict";
let methodType;
document.querySelector(".get").addEventListener("click", function () {
  methodType = "GET";
  requestHandler();
});
document.querySelector(".post").addEventListener("click", function () {
  methodType = "POST";
  requestHandler();
});
document.querySelector(".put").addEventListener("click", function () {
  methodType = "PUT";
  requestHandler();
});
document.querySelector(".delete").addEventListener("click", function () {
  methodType = "DELETE";
  deleteHandler();
});

const getInputValue = function () {
  return Number(document.querySelector(".input").value);
};

async function requestHandler() {
  try {
    const options = {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (methodType === "POST" || methodType === "PUT") {
      options.body = JSON.stringify({ number: getInputValue() });
      if (methodType === "PUT") {
        options.body = JSON.stringify({
          number: prompt("What number would you like to replace?"),
          new: getInputValue(),
        });
      }
    }
    const response = await fetch(
      `http://localhost:8081/${methodType.toLowerCase()}`,
      options
    );
    const bodyResponse = `${await response.text()} + Response Code ${await response.status}`;
    document.querySelector(".response").textContent = bodyResponse;
    console.log(bodyResponse);
  } catch (error) {
    console.log(error);
  }
}
async function deleteHandler() {
  try {
    const options = {
      method: methodType,
    };
    const response = await fetch(
      `http://localhost:8081/${getInputValue()}`,
      options
    );
    const bodyResponse = `${await response.text()} + Response Code ${await response.status}`;
    document.querySelector(".response").textContent = bodyResponse;
  } catch (error) {
    console.log(error);
  }
}
