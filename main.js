import {getValueRadio,setInner,onClick,hide,show,getValue} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {getHash} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {get,postWithToken} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";


get("https://dhanihape.alwaysdata.net/rate/selfie/"+getHash(),runafterGet)

onClick("tombol",runOnRating);

function runafterGet(result){
    console.log(result);
    result.iduser && setInner("petugas",result.iduser);
    result.nama && setInner("petugas",result.nama);
    // Mengganti \n dengan <br> untuk menampilkan baris baru
    let solusiDenganBarisBaru = result.solusi.replace(/\n/g, "<br>");
    setInner("solusi", solusiDenganBarisBaru);
}

function runOnRating(){
    let datarating={
        id:getHash(),
        rating:Number(getValueRadio("rating")),
        komentar:getValue("komentar")
    }
    setInner("feedback","Mohon tunggu sebentar data sedang dikirim");
    postWithToken("https://dhanihape.alwaysdata.net/rate/selfie","login",getCookie("login"),datarating,responseFunction);
}

function responseFunction(result){
    console.log(result);
    setInner("feedback","Feedback berhasil dikirim terima kasih. "+result.info);

}
