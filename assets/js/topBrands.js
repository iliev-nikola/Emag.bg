const topBrands = document.getElementById("topBrands");
const mobileBrands = document.getElementById("mobileBrands");
const electronicsBrands = document.getElementById("electronicsBrands");
const healthBRands = document.getElementById("healthBRands");
const fashionBrands = document.getElementById("fashionBrands");
let allBrandsSections = document.getElementsByClassName('brands');
topBrands.style.display = 'block';
mobileBrands.style.display = 'none';
electronicsBrands.style.display = 'none';
healthBRands.style.display = 'none';
fashionBrands.style.display = 'none';
for (let i = 0; i < allBrandsSections.length; i++) {
    allBrandsSections[i].addEventListener("click", function (ev) {
        ev.preventDefault();
        switch (i) {
            case 0:
                topBrands.style.display = 'block';
                mobileBrands.style.display = 'none';
                electronicsBrands.style.display = 'none';
                healthBRands.style.display = 'none';
                fashionBrands.style.display = 'none';
                break;
            case 1:
                topBrands.style.display = 'none';
                mobileBrands.style.display = 'block';
                electronicsBrands.style.display = 'none';
                healthBRands.style.display = 'none';
                fashionBrands.style.display = 'none';
                break;
            case 2:
                topBrands.style.display = 'none';
                mobileBrands.style.display = 'none';
                electronicsBrands.style.display = 'block';
                healthBRands.style.display = 'none';
                fashionBrands.style.display = 'none';
                break;
            case 3:
                topBrands.style.display = 'none';
                mobileBrands.style.display = 'none';
                electronicsBrands.style.display = 'none';
                healthBRands.style.display = 'block';
                fashionBrands.style.display = 'none';
                break;
            case 4:
                topBrands.style.display = 'none';
                mobileBrands.style.display = 'none';
                electronicsBrands.style.display = 'none';
                healthBRands.style.display = 'none';
                fashionBrands.style.display = 'block';
                break;

        }

    })
}