import "../css/style.css";
import {enableGoToTopBtn} from "./buttons/goToTop";
import {MovieHandler} from "./handlers/MovieHandler";

window.onload = (): void => {
    enableGoToTopBtn();
    new MovieHandler();
}