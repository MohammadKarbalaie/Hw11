import { errorHandler } from "../libs/error-handler";
import { GetProductsInfo } from "../apis/services/product-details.servies";
import { toast } from "../libs/toast.ts";

interface Product {  
    imageURL: string;  
    name: string;  
    price: number;  
    sizes: string; // e.g., "S|M|L"  
    colors: string; // e.g., "#FFFFFF|#000000"  
}   

const pimage = document.getElementById('Productimg') as HTMLImageElement;  
const pname = document.getElementById('Productname') as HTMLElement;  
const psize = document.getElementById('Productsize') as HTMLElement;  
const pcolor = document.getElementById('Productcolor') as HTMLElement;  
const pprice = document.getElementById('Productprice') as HTMLElement;  
const minusButton = document.getElementById('minus') as HTMLButtonElement;  
const plusButton = document.getElementById('plus') as HTMLButtonElement;  
const resultDisplay = document.getElementById('resultq') as HTMLElement;  
let count = 0;  

minusButton.addEventListener('click', () => {  
    if (count > 0) {  
        count--;  
        resultDisplay.textContent = count.toString();  
    }  
});  

plusButton.addEventListener('click', () => {  
    count++;  
    resultDisplay.textContent = count.toString();  
});  

const toggleButton = document.getElementById('viewMoreBtn') as HTMLButtonElement;  
const paragraph = document.getElementById('textContent') as HTMLElement;  

toggleButton.textContent = 'View More';  
toggleButton.className = 'view-more-button';  

const fullText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, mollitia.';  
const truncatedText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';  

paragraph.textContent = truncatedText;  

toggleButton.addEventListener('click', () => {  
    if (paragraph.textContent === truncatedText) {  
        paragraph.textContent = fullText;  
        toggleButton.textContent = 'View Less';  
    } else {  
        paragraph.textContent = truncatedText;  
        toggleButton.textContent = 'View More';  
    }  
});  

async function fetchProductInfo(id: number) {  
    try {  
        const response = await GetProductsInfo(id);  
        displayProductInfo(response);  
    } catch (error) {  
        errorHandler(error);  
    }  
}  

let selectedSize: string | null = null;  

function displayProductInfo(product: Product) {  
    pimage.src = product.imageURL;  
    pname.textContent = product.name;  
    pprice.textContent = `$${product.price}.00`;  

    psize.innerHTML = '';  
    const sizesArray = product.sizes.split('|');  
    sizesArray.forEach(size => {  
        const sizeButton = document.createElement('button');  
        sizeButton.textContent = size;  
        sizeButton.style.border = "1px solid black";  
        sizeButton.style.borderRadius = "50%";  
        sizeButton.style.padding = '10px 15px';  

        if (selectedSize === size) {  
            sizeButton.style.backgroundColor = "black";  
            sizeButton.style.color = "white";  
        } else {  
            sizeButton.style.backgroundColor = "white";  
            sizeButton.style.color = "black";  
        }  

        sizeButton.onclick = () => {  
            if (selectedSize) {  
                const previousButton = psize.querySelector(`button[data-size='${selectedSize}']`) as HTMLButtonElement; 
                
                if (previousButton) {  
                    previousButton.style.backgroundColor = "white";  
                    previousButton.style.color = "black";  
                }  
            }  
        
            selectedSize = size;  
            sizeButton.style.backgroundColor = "black";  
            sizeButton.style.color = "white";  
        };  
        sizeButton.setAttribute('data-size', size);  
        psize.appendChild(sizeButton);  
    });  

    pcolor.innerHTML = '';  
    const colorsArray = product.colors.split('|');  
    let selectedColorButton: HTMLButtonElement | null = null;  
    colorsArray.forEach(color => {  
        const colorButton = document.createElement('button');  
        colorButton.style.backgroundColor = color;  
        colorButton.style.padding = '0px 25px';  
        colorButton.style.position = 'relative';  
        colorButton.style.border = "1px solid black";  
        colorButton.style.borderRadius = "50%";  
        colorButton.style.marginLeft = '3px';  
        
        colorButton.onclick = () => {  
            if (selectedColorButton) {  
                selectedColorButton.innerHTML = '';  
            }  
            const img1 = '<i class="fas fa-check w-full text-3xl absolute px-8 top-2 right-2 text-gray-400"></i>';  
            colorButton.innerHTML = img1;  
            selectedColorButton = colorButton;  
        };  

        pcolor.appendChild(colorButton);  
    });  
}  

function getQueryParams() {  
    const params = new URLSearchParams(window.location.search);  
    return {  
        id: params.get('id')  
    };  
}  

const { id } = getQueryParams();  

loadProductDetails(id);  

async function loadProductDetails(id: string | null) {  
    if (id) {  
        await fetchProductInfo(parseInt(id, 10));  
    } else {  
        // Assuming you have a toast function defined somewhere  
        toast("Product ID is missing.");  
    }  
}