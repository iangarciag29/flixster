const toggleBtn = document.getElementById("scrollToTopBtn")! as HTMLButtonElement;


export const enableGoToTopBtn = (): void => {
    document.addEventListener('scroll', (): void => {
        let yPos: number = window.scrollY;
        if (yPos > 200) {
            toggleBtn.classList.remove("hidden");
        } else {
            toggleBtn.classList.add("hidden")
        }
    });

    toggleBtn.addEventListener('click', (): void => {
        window.scrollTo(0, 0);
    })
}