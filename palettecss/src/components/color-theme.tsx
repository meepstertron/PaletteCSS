"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Dices } from "lucide-react"

interface ColorTheme {
  // Text colors
  textPrimary: string
  textSecondary: string
  textMuted: string

  // Background colors
  bgPrimary: string
  bgSecondary: string
  bgAccent: string

  // Interactive elements
  linkDefault: string
  linkHover: string
  linkVisited: string

  // Borders and dividers
  borderColor: string
  dividerColor: string

  // Shadows
  shadowColor: string

  // Status colors
  success: string
  error: string
  warning: string
  info: string

    // Values
    borderRadius: string
    margin: string
    padding: string

}

const defaultTheme: ColorTheme = {
  textPrimary: "#000000",
  textSecondary: "#4A4A4A",
  textMuted: "#767676",
  bgPrimary: "#FFFFFF",
  bgSecondary: "#F5F5F5",
  bgAccent: "#E0E0E0",
  linkDefault: "#0070F3",
  linkHover: "#0051A8",
  linkVisited: "#6B46C1",
  borderColor: "#E2E8F0",
  dividerColor: "#CBD5E0",
  shadowColor: "rgba(0, 0, 0, 0.1)",
  success: "#48BB78",
  error: "#F56565",
  warning: "#ED8936",
  info: "#4299E1",
  borderRadius: "4px",
    margin: "1",
    padding: "1",

}

export default function ColorThemeViewer() {
  const [theme, setTheme] = useState<ColorTheme>(defaultTheme)

  const handleColorChange = (key: keyof ColorTheme, value: string) => {
    setTheme((prevTheme) => ({ ...prevTheme, [key]: value }))
  }

  const copyThemeToClipboard = () => {
    const themeString = JSON.stringify(theme, null, 2)
    navigator.clipboard.writeText(themeString)
  }

  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }



  const shuffleColors = () => {
    const darkmode = random(0, 1) === 1
    // Generate base colors for the theme
    const primaryHue = random(0, 360)
    const accentHue = (primaryHue + random(30, 60)) % 360 


   
    const hslToHex = (h: number, s: number, l: number): string => {
        l /= 100
        const a = s * Math.min(l, 1 - l) / 100
        const f = (n: number) => {
            const k = (n + h / 30) % 12
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
            return Math.round(255 * color).toString(16).padStart(2, '0')
        }
        return `#${f(0)}${f(8)}${f(4)}`
    }

    const constraints = {
        // Text colors based on dark/light mode
        textPrimary: darkmode ? hslToHex(0, 0, 95) : hslToHex(0, 0, 10),
        textSecondary: darkmode ? hslToHex(0, 0, 80) : hslToHex(0, 0, 30),
        textMuted: darkmode ? hslToHex(0, 0, 60) : hslToHex(0, 0, 50),

        bgPrimary: darkmode ? hslToHex(0, 0, 10) : hslToHex(0, 0, 100),
        bgSecondary: darkmode ? hslToHex(0, 0, 15) : hslToHex(0, 0, 95),
        bgAccent: hslToHex(accentHue, 60, darkmode ? 25 : 90),

        linkDefault: hslToHex(accentHue, 60, darkmode ? 65 : 45),
        linkHover: hslToHex(accentHue, 70, darkmode ? 75 : 35),
        linkVisited: hslToHex((accentHue + 15) % 360, 60, darkmode ? 60 : 50),

        // Borders and dividers
        borderColor: darkmode ? hslToHex(0, 0, 20) : hslToHex(0, 0, 85),
        dividerColor: darkmode ? hslToHex(0, 0, 25) : hslToHex(0, 0, 90),
        shadowColor: `rgba(0, 0, 0, ${darkmode ? 0.3 : 0.1})`,


        success: hslToHex((primaryHue + 120) % 360, 70, darkmode ? 40 : 45),
        error: hslToHex((primaryHue - 60) % 360, 70, darkmode ? 50 : 55),
        warning: hslToHex((accentHue + 15) % 360, 70, darkmode ? 45 : 50),
        info: hslToHex(accentHue, 70, darkmode ? 45 : 50),

        // Layout values with reasonable constraints
        borderRadius: `${random(2, 8)}px`,
        margin: `${random(1, 2)}`,
        padding: `${random(1, 2)}`,
    }

    setTheme((prevTheme) => ({ ...prevTheme, ...constraints }))



  }

  const renderColorInput = (key: keyof ColorTheme, label: string) => {

    const isValue = ['borderRadius', 'margin', 'padding'].includes(key)
    
    return (
      <div key={key} className="mb-4">
        <Label htmlFor={key} className="mb-1 block">
          {label}
        </Label>
        <div className="flex items-center space-x-2">
          {!isValue && (
            <Input
              type="color"
              id={`${key}-color`}
              value={theme[key]}
              onChange={(e) => handleColorChange(key, e.target.value)}
              className="h-10 w-10 p-0 border-none"
            />
          )}
          <Input
            type="text"
            value={theme[key]}
            onChange={(e) => handleColorChange(key, e.target.value)}
            className="flex-grow"
          />
        </div>
      </div>
    )
  }

  const colorGroups = [
    { name: "Text", colors: ["textPrimary", "textSecondary", "textMuted"] },
    { name: "Background", colors: ["bgPrimary", "bgSecondary", "bgAccent"] },
    { name: "Links", colors: ["linkDefault", "linkHover", "linkVisited"] },
    { name: "Borders", colors: ["borderColor", "dividerColor", "shadowColor"] },
    { name: "Status", colors: ["success", "error", "warning", "info"] },
    { name: "Values", colors: ["borderRadius", "margin", "padding"] },
  ]

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">PaletteCSS</h1>
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <Tabs defaultValue={colorGroups[0].name.toLowerCase()} className="w-full">
            <TabsList className="mb-4">
              {colorGroups.map((group) => (
                <TabsTrigger key={group.name} value={group.name.toLowerCase()}>
                  {group.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {colorGroups.map((group) => (
              <TabsContent key={group.name} value={group.name.toLowerCase()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {group.colors.map((color) =>
                    renderColorInput(color as keyof ColorTheme, color.replace(/([A-Z])/g, " $1").trim()),
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <Button onClick={copyThemeToClipboard} className="mt-6 mr-2">
            <Copy className="w-4 h-4 mr-2" />
            Copy Theme to Clipboard
          </Button>
          <Button onClick={shuffleColors} className="mt-6">
            <Dices className="w-4 h-4 mr-2" />
            Shuffle Colors
          </Button>
            <Tabs defaultValue="CSSvariables" className="w-full mt-6">
                <TabsList className="mb-4">
                    <TabsTrigger value="CSSvariables">CSS Variables</TabsTrigger>
                    <TabsTrigger value="JSON">JSON</TabsTrigger>
                </TabsList>
                <TabsContent value="CSSvariables">
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {`/* CSS Variables */`}
                    {Object.entries(theme).map(([key, value]) => (
                        <div key={key}>{`--${key}: ${value};`}</div>
                    ))}
                    </pre>
                </TabsContent>
                <TabsContent value="JSON">
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {JSON.stringify(theme, null, 2)}
                    </pre>
                </TabsContent>
            </Tabs>

        </TabsContent>
        <TabsContent value="preview">
          <div className="space-y-8">
            <div 
              style={{ 
                backgroundColor: theme.bgPrimary,
                borderRadius: theme.borderRadius,
                margin: `${theme.margin}rem`,
                padding: `${theme.padding}rem`
              }} 
              className="shadow-md"
            >
              <h2 style={{ color: theme.textPrimary }} className="text-2xl font-bold mb-4">
                Color Theme Preview
              </h2>
              <p style={{ color: theme.textSecondary }} className="mb-2">
                This is how your color theme looks in action.
              </p>
              <p style={{ color: theme.textMuted }} className="mb-4">
                Muted text appears like this.
              </p>
              <div style={{ backgroundColor: theme.bgSecondary }} className="p-4 rounded">
                <p style={{ color: theme.textPrimary }}>This is a secondary background section.</p>
              </div>
              <div style={{ backgroundColor: theme.bgAccent }} className="mt-4 p-4 rounded">
                <p style={{ color: theme.textPrimary }}>This is an accent background section.</p>
              </div>
              <div className="mt-4">
                <a href="#" style={{ color: theme.linkDefault }}>
                  Default Link
                </a>
                <a href="#" style={{ color: theme.linkHover }} className="ml-4">
                  Hover Link
                </a>
                <a href="#" style={{ color: theme.linkVisited }} className="ml-4">
                  Visited Link
                </a>
              </div>
              <hr style={{ borderColor: theme.dividerColor }} className="my-4" />
              <div className="flex space-x-4">
                <div style={{ backgroundColor: theme.success }} className="p-2 rounded text-white">
                  Success
                </div>
                <div style={{ backgroundColor: theme.error }} className="p-2 rounded text-white">
                  Error
                </div>
                <div style={{ backgroundColor: theme.warning }} className="p-2 rounded text-white">
                  Warning
                </div>
                <div style={{ backgroundColor: theme.info }} className="p-2 rounded text-white">
                  Info
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

