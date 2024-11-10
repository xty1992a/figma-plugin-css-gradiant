import {extractLinearGradientParamsFromTransform} from '@figma-plugin/helpers'
import {figmaRGBToWebRGB} from "@figma-plugin/helpers/dist/helpers/convertColor";
import {
    getLinearGradientPoints,
    getOffset,
    getAngleBetween,
    orderPoints,
    stickyTo
} from "./tools";

figma.showUI(__html__, {
    width: 500,
    height: 500,
})

const log = (label: string, ...rest: any) => {
    console.log()
    console.log('[提示]', label)
    console.log(...rest)
    console.log()
}

const rdm = () => Math.random().toString(36).substr(2, 15);


figma.ui.onmessage = async ({id, type, payload = {}}: any) => {
    try {
        const selection = figma.currentPage.selection
        const node = selection[0]
        const [fill] = node.fills || []
        if (!fill) return

        const colors: string[] = fill.gradientStops
            .map((n: any) => figmaRGBToWebRGB(n.color).join(','))
            .map((n: any) => `rgba(${n})`)

        const rect = {
            x: 0,
            y: 0,
            width: node.width,
            height: node.height,
        }

        const {
            start: startRatio,
            end: endRatio
        } = extractLinearGradientParamsFromTransform(1, 1, fill.gradientTransform)
        // figma的渐变控制点
        const start = {
            x: startRatio[0] * node.width, y: startRatio[1] * node.height
        }
        const end = {
            x: endRatio[0] * node.width, y: endRatio[1] * node.height
        }

        const angle = getAngleBetween(start, end)
        // figma的渐变控制点
        const figmaGradientLine = {start, end}
        const gradientPoints = getLinearGradientPoints(rect, angle).farthestPoints
        // web的渐变控制点
        const gradientLine = orderPoints(figmaGradientLine, gradientPoints)

        log('渐变线', gradientLine)
        const line = stickyTo(figmaGradientLine, gradientLine)

        const offsets = getOffset({
            figma: line,
            web: gradientLine
        })

        const toPercent = (n: number) => (n * 100).toFixed(2) + '%'

        const backgroundImage = `linear-gradient(${(angle + 90).toFixed(2)}deg, ${colors.map((color, index) => {
            return `${color} ${toPercent(offsets[index])}`
            // return color
        }).join(',')})`

        figma.ui.postMessage({
            type: 'callback',
            payload: {
                node: {
                    width: node.width,
                    height: node.height,
                },
                backgroundImage
            },
        })
    } catch (error) {
        console.log(error)
    }
}
