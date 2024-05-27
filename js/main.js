var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var allSitesInfo;

if (localStorage.getItem("allSitesInfo") != null) {
    allSitesInfo = JSON.parse(localStorage.getItem("allSitesInfo"));
    display();
}
else {
    allSitesInfo = [];
}

function getValues() {
    var name = siteName.value;
    var url = siteUrl.value;

    if (!validateUrl(url)) {
        errorMessage.textContent = "Please enter a valid URL.";
        errorMessage.style.color = "red";
        return;
    }

    errorMessage.textContent = ""; // Clear any previous error message

    var singleSiteInfo = {
        name: name,
        url: url
    };
    allSitesInfo.push(singleSiteInfo);
    localStorage.setItem("allSitesInfo", JSON.stringify(allSitesInfo));

    clearInput();
    display();
}

function validateUrl(url) {
    var pattern = new RegExp("\\b((https?|ftp):\\/\\/)?([a-zA-Z0-9\\-\\.]+)(\\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\\/[^\\s]*)?\\b");
    return pattern.test(url);
}

function clearInput() {
    siteName.value = "";
    siteUrl.value = "";
}

function display() {
    var cartona = "";
    for (var i = 0; i < allSitesInfo.length; i++) {
        cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${allSitesInfo[i].name}</td>
        <td><button type="submit" id="visit" class="btn btn-success" onclick="visitSite('${allSitesInfo[i].url}')"> <i class="fa-solid fa-eye"></i> Visit</button></td>
        <td><button type="submit" id="delete" class="btn btn-danger" onclick="deleteElement(${i})"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
      </tr>
        `
    }
    document.getElementById("demo").innerHTML = cartona
}

function deleteElement(index) {
    allSitesInfo.splice(index, 1);
    localStorage.setItem("allSitesInfo", JSON.stringify(allSitesInfo));
    display();
}

function visitSite(url) {
    window.open(url, '_blank');
}

