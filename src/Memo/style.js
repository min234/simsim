import styled from "styled-components";

export const Components = styled.div`
a{
text-decoration-line: none;
}
display: flex;
    justify-content: center;
ul{
 list-style:none;
     padding: 0;
}
     .front{
     display:flex;  
     }
li{
transition: transform .2s;
    position: relative;
    display: flex;
    font-size: 20px;
    justify-content: space-between;
    min-height: 35px;
    align-items: center;
    border-radius: 10px;
    margin: 0 10px 5px;
    background-color: #fff6c6;
    box-shadow: 0 2px #524c49;
    color:black;
}
li:hover{
cursor: pointer;
background-color: #fff;
}
.background{
border-radius: 32px 32px 0px 0px;
    background-color:#bcb8b1;;
    min-width: 50%;
     min-height: 500px; 
    height: auto; 
    
}
button {
    margin: 30px;
}
.bar{
    border-radius: 30px 30px 0px 0px;
    display: flex;
    justify-content: space-between;
  
    margin-bottom: 21px;
    height: 108px;
    background-color: #8a817c;
    }
.w-btn {
    position: relative;
    border: none;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: border 0.25s, color 0.25s, background-color 0.25s;
}
  

.w-btn-indigo {
    background-color: #463f3a;
    color: #fff;
    cursor: pointer;
}

.w-btn-indigo:hover {
     border: 3px solid aliceblue;
    color: #fff;
    transform: scale(1.1);
}
.w-btn-pink {
    background-color: #f199bc;
    color: #d4dfe6;
    cursor: pointer;
}
    
.w-btn-pink:hover {
border: 3px solid aliceblue;
color: #d4dfe6;
transform: scale(1.1);
}

.left{
display: flex;
    justify-content: flex-start;
    }
.right{
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    }
    .text_title{
        border: 1px solid grey;
    border-radius: 5px;
    outline: none;
    background-color: #f5f5f5;
    color: #463f3a;
    margin: 0 2px 10px;
    flex-grow: .5;
    font-family: "Jua", sans-serif;
    font-size: 18px;
    font-weight: 900;
    padding: 0px 5px;
    width: 98%;
    }
    .content{
    width: 98%;
    height: 250px;
    border: 1px solid grey;
    border-radius: 5px;
    outline: none;
    background-color: #f5f5f5;
    color: #463f3a;
    margin: 0px 2px 10px;
    padding: 5px;
    resize: none;
    
    font-family: "Jua", sans-serif;
    line-height: 25px;
    font-size: 16px;
    }

.upload{
    transition: transform .2s;
    display: flex;
    padding: 15px 30px;
    flex-grow: .5;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-family: "Kalam", cursive;
    font-size: 20px;
    text-align: center;
    font-weight: 900;
    background-color: #8a817c;
    color: #f4f3ee;
    cursor: pointer;
    transition: border 0.25s, color 0.25s, background-color 0.25s;

    }
    .upload:hover{
        background-color: #fff;
        color:#8a817c;
        transform: scale(1);
    }
`