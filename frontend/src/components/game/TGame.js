import React, { useState } from "react";
import axios from 'axios';
import server from "../../API/server";
import "./TGame.css"
import Editor from "@monaco-editor/react";
import { ToggleButton } from "@mui/material";
import {  } from "@mui/system";

function TGame() {
    const API_BASE_URL = server.BASE_URL;
    const API_Judge_URL = server.Judge_URL;
    var nuriCode, input;
    const [result, setResult] = useState(null);
    const [javaCode, setJavaCode] = useState(null);
    const [toggle, setToggle] = useState(true);
    var [theme, setTheme] = useState("vs-light");

    const encode = (str) => {
        return btoa(unescape(encodeURIComponent(str)));
    }

    const decode = (bytes) => {
        var escaped = escape(atob(bytes));
        try {
            return decodeURIComponent(escaped);
        } catch {
            return unescape(escaped);
        }
    }

    function run() {
        console.log(input);
        var encodeNuriCode = encode(javaCode);
        var encodeInput = encode(input);
        var data = {
            source_code: encodeNuriCode,
            language_id: 62,
            stdin: encodeInput,
            compiler_options: "",
            command_line_arguments: "",
            redirect_stderr_to_stdout: true
        }
        console.log(javaCode);
        axios
            .post(API_Judge_URL + '/submissions?base64_encoded=true&wait=true',
                data,
                {
                    Headers: {
                        contentType: "application/json"
                    }
                })
            .then((res) => {
                console.log(javaCode);
                console.log(decode(res.data.stdout));
                setResult(decode(res.data.stdout));
            })
    }

    function nuriCodeHandler(e) {
        var data = {
            id:"",
            mathGameId:"",
            userCode:e
        }
        axios
        .post(API_BASE_URL + "/api/v1/console/convert",
        data,{
            Headers:{
                contentType: "application/json"
            }
        })
        .then((res)=>{
            setJavaCode(res.data);
        })
    }

    function toggleClick(){
        setToggle((prev) => !prev);
        console.log(toggle);
        if(toggle){
            setTheme("vs-dark");
        }else{
            setTheme("vs-light");
        }
    }

    function inputValueHandler(e){
        input = e;
    }
    
    return (
        <div className="ide-contents">

            <div>테마 설정</div>
            <ToggleButton onClick={toggleClick} toggle={toggle}>
            </ToggleButton>
            <h3>{toggle ? "OFF" : "ON"}</h3>

            <div>누리 코드</div>
            <Editor
                id="nuriCode"
                height="30vh"
                defaultLanguage="java"
                defaultValue=""
                theme={theme}
                value={`import java.util.Random;
                import java.util.Scanner;
                
                public class test2 {
                    public static void main(String []args){
                        Scanner sc = new Scanner(System.in);
                    Random r = new Random();
                            // 실제 게임 로직 작성
                        System.out.println("<<< Game Start >>>");
                        int count = 0;
                        while (true) {
                            System.out.println("<< your Turn >>");
                            System.out.print("Input Number(1~3) : ");
                            int uNum = 2;
                            for (int i = 0; i < uNum; i++) {
                                count++;
                                System.out.println((count) + "!");
                                if (count == 31) {
                                    System.out.println("패배");
                                }
                            }
                            
                            if (count >= 31) {
                                break;
                            }
                            System.out.println("<< Computer Turn >>");
                            int cNum = r.nextInt(3) + 1;
                            for (int i = 0; i < cNum; i++) {
                                count++;
                                System.out.println((count) + "!");
                                if (count == 31) {
                                    System.out.println("승리");
                                    break;
                                }
                            }
                            if (count >= 31) {
                                break;
                            }
                        }
                  }
                }`}
                onChange={nuriCodeHandler}
            />

            <div>자바 코드</div>
            <Editor
                id="javaCode"
                height="30vh"
                defaultLanguage="java"
                defaultValue=""
                theme={theme}
                value={javaCode}
            />

            <div><button onClick={run}>RUN</button></div>
            <div>결과</div>
            <Editor
                id="result"
                height="30vh"
                defaultLanguage="java"
                defaultValue=""
                theme={theme}
                value={result}
            />

        </div>
    );
}

export default TGame;