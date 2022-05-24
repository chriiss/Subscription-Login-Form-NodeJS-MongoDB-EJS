export class Home {
    homeEvent() {
        document.querySelector("#hello").addEventListener("click", () => {
            alert("hello");
        })
    }
}