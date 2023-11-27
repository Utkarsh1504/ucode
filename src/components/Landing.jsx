import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { languageOptions } from "../constants/languageOptions";
// import useKeyPress from "../hooks/usePressKey";
import { AiOutlineSetting } from "react-icons/ai";

import Footer from "./Footer";
import CodeEditor from "./CodeEditor";
import LangDropdown from "./LangDropdown";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";
import OutputDetails from "./OutputDetails";

const javaDefault = `// default class should be Main

import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) {
    // code goes here
    // Scanner sc=new Scanner(System.in);
  }
}`;

const Landing = () => {
  const [code, setCode] = useState(javaDefault);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let status = err.response.status;
        if (status === 429) {
          toast.error("quota exceeded");
        }
        setProcessing(false);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        toast.success(`compiled`);
        return;
      }
    } catch (err) {
      setProcessing(false);
      toast.error(err.message);
    }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="flex flex-row">
        <div className="px-4 py-2 mt-2">
          <LangDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2 mt-4 hover:opacity-70 transition">
          <AiOutlineSetting size={26} />
        </div>
      </div>
      <div className="flex flex-row space-x-2 items-start px-4 py-2">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditor
            code={code}
            onChange={onChange}
            language={language?.value}
          />
        </div>

        <div className="right-container mt-[-35px] flex flex-shrink-0 w-[30%] flex-col">
          <InputSection
            customInput={customInput}
            setCustomInput={setCustomInput}
          />
          <OutputSection outputDetails={outputDetails} />
          <div className="flex flex-col items-start mt-2">
            <button
              onClick={handleCompile}
              disabled={!code}
              className="px-4 py-2 bg-green-500 font-bold text-white rounded-md hover:bg-green-700"
            >
              {processing ? "Running..." : "Run"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Landing;
