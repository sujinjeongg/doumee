import React from "react";
 
function Details({
    addr1,
    contentTypeid,
    areaCode,
    sigunguCode
}){
    return(
        <div className="details">
            <h3>tourist attractions</h3>
            <div className="addr1">address:{addr1}</div>
            <div className="contentTypeid">Tour type:{contentTypeid}</div>
            <div className="areaCode">Area:{areaCode}</div>
            <div className="sigunguCode">sigungu:{sigunguCode}</div>
        </div>
    );
}
export default Details;