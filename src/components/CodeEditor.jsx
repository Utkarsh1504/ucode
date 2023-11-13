import { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";

// eslint-disable-next-line react/prop-types
const CodeEditor = ({ onChange, language, code }) => {
  const [value, setValue] = useState(code || "");

  const cppSampleCode = `#include <bits/stdc++.h>
using namespace std;
  
int main() {
  // Your C++ code here
  return 0;
}`;
  const javaSampleCode = `// default class should be Main

import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) {
    // code goes here
    // Scanner sc=new Scanner(System.in);
  }
}`;

  useEffect(() => {
    if (language === "java") {
      setValue(javaSampleCode);
    } else if (language === "cpp") {
      setValue(cppSampleCode);
    }
  }, [language, javaSampleCode, cppSampleCode]);

  const handleEditorChange = (value) => {
    <div className="right-container"></div>;
    setValue(value);
    onChange("code", value);
  };

  const options = {
    fontSize: "18px",
  };
  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        options={options}
        height="85vh"
        width={`100%`}
        language={language || "java"}
        value={value}
        theme="vs-dark"
        defaultValue={javaSampleCode}
        onChange={handleEditorChange}
        style={{ fontSize: "16px" }}
      />
    </div>
  );
};
export default CodeEditor;
