import {getValueRadio,setInner,onClick,setValue,show,getValue,onInput} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/element.js";
import {getHash} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {get,postWithToken} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {getCookie,setCookieWithExpireDay} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {validateHouseNumber} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/validate.js";


get("https://dhanihape.alwaysdata.net/rate/selfie/"+getHash(),runafterGet)

onClick("tombol",runOnRating);
onInput("nomor",validateHouseNumber);
getCookie("nomor") && setValue("nomor",getCookie("nomor"));

function runafterGet(result){
    console.log(result);
    setInner("petugas", result.nama || result.iduser);
    // Mengganti \n dengan <br> untuk menampilkan baris baru
    //let solusiDenganBarisBaru = result.solusi.replace(/\n/g, "<br>");
    //setInner("solusi", solusiDenganBarisBaru);
}

function runOnRating(){
    let datarating={
        id:getHash(),
        rating:Number(getValueRadio("rating")),
        nomor:getValue("nomor"),
        komentar:getValue("komentar")
    }
    getValue("nomor") && setCookieWithExpireDay("nomor",getValue("nomor"),365);
    setInner("feedback","Mohon tunggu sebentar data sedang dikirim");
    postWithToken("https://dhanihape.alwaysdata.net/rate/selfie","login",getCookie("login"),datarating,responseFunction);
}

function responseFunction(result){
    console.log(result);
    setInner("feedback", result.info === "1" ? "Feedback berhasil dikirim terima kasih." : "Feedback gagal dikirim, coba lagi.");
}
