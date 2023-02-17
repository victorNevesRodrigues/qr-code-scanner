const scanContainer = document.querySelector(".scanContainer")
const uploadBox = document.querySelector(".uploadBox")
const uploadBoxMessage = document.querySelector("h2")
const inputFile = document.querySelector("[type=file]")
const textArea = document.querySelector(".content textarea")
const uploadBoxImg = document.querySelector(".uploadBox img")
const copyButton = document.querySelector(".copy")
const scanAnotherButton = document.querySelector(".scanAnother")

function fetchRequest (formData) {
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        scanContainer.classList.add("show")
        textArea.innerText = result[0].symbol[0].data
        uploadBoxImg.setAttribute("src", "./assets/qrcode.png")
        uploadBoxMessage.innerText = "QR Code Escaneado"
    })
}

copyButton.addEventListener("click", () => {
    let text = textArea.textContent
    navigator.clipboard.writeText(text)
})

inputFile.addEventListener("change", e => {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append("file", file)
    fetchRequest(formData)
})

uploadBox.addEventListener("click", () => inputFile.click())

scanAnotherButton.addEventListener("click", () => {
    uploadBoxImg.setAttribute("src", "./assets/upload.svg")
    uploadBoxMessage.innerText = "Escanear Outro QR Code"
    scanContainer.classList.remove("show")
})