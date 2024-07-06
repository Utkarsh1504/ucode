import Select from "../../common/Select";
import { useSettings } from "../../../context/SettingContext";
import useResponsive from "../../../hooks/useResponsive";
import { editorFonts } from "../../../resources/Fonts";
import { editorThemes } from "../../../resources/Themes";
import { langNames } from "@uiw/codemirror-extensions-langs";
import { ChangeEvent, useEffect } from "react";
import { PiCaretDownBold } from "react-icons/pi";

function SettingsView() {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    resetSettings,
  } = useSettings();
  const { viewHeight } = useResponsive();

  const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setFontFamily(e.target.value);
  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setTheme(e.target.value);
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setLanguage(e.target.value);
  const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setFontSize(parseInt(e.target.value));

  useEffect(() => {
    // Set editor font family
    const editor = document.querySelector(
      ".cm-editor > .cm-scroller"
    ) as HTMLElement;
    if (editor !== null) {
      editor.style.fontFamily = `${fontFamily}, monospace`;
    }
  }, [fontFamily]);

  return (
    <div
      className="flex flex-col items-center gap-2 p-4"
      style={{ height: viewHeight }}
    >
      <h1 className="view-title">Settings</h1>
      {/* Choose Font Family option */}
      <div className="flex w-full items-end gap-2">
        <Select
          onChange={handleFontFamilyChange}
          value={fontFamily}
          options={editorFonts}
          title="Font Family"
        />
        {/* Choose font size option */}
        <div className="relative">
          <select
            value={fontSize}
            onChange={handleFontSizeChange}
            className="rounded-md border-none w-[70px] bg-[#313131] px-4 py-2 text-white outline-none"
            title="Font Size"
          >
            {[...Array(13).keys()].map((size) => {
              return (
                <option className="border-none radius-2" key={size} value={size + 12}>
                  {size + 12}
                </option>
              );
            })}
          </select>
          <PiCaretDownBold
            size={16}
            className="absolute bottom-3 cursor-pointer right-3 z-10 text-white"
          />
        </div>
      </div>
      {/* Choose theme option */}
      <Select
        onChange={handleThemeChange}
        value={theme}
        options={Object.keys(editorThemes)}
        title="Theme"
      />
      {/* Choose language option */}
      <Select
        onChange={handleLanguageChange}
        value={language}
        options={langNames}
        title="Language"
      />
      <button
        className="mt-auto w-full rounded-md border-none bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white outline-none"
        onClick={resetSettings}
      >
        Reset to default
      </button>
    </div>
  );
}

export default SettingsView;
