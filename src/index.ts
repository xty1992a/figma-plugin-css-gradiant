import {extractLinearGradientParamsFromTransform} from '@figma-plugin/helpers'
import {Theta, getCross, getAngleBetween, crossWith, getCrossPoint, intersection, distance, getMidPoint} from './utils'
import {figmaRGBToWebRGB} from "@figma-plugin/helpers/dist/helpers/convertColor";
import {calculateOffsets, calculatePerpendicularDistances, getLinearGradientPoints, orderPoints} from "./tools";

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
        const gradientHandlePositions = [
            {x: startRatio[0], y: startRatio[1]},
            {x: endRatio[0], y: endRatio[1]},
            {x: 0, y: 0},
        ]

        // figma的渐变控制点
        const start = {
            x: gradientHandlePositions[0].x * node.width, y: gradientHandlePositions[0].y * node.height
        }
        const end = {
            x: gradientHandlePositions[1].x * node.width, y: gradientHandlePositions[1].y * node.height
        }

        const angle = getAngleBetween(start, end)

        const theta = Theta.Degrees(angle)

        log('背景填充', fill)
        log('填充颜色', colors)
        log('节点尺寸', rect)

        log('填充控制点', start, end)
        log('填充角度', theta.degrees)


        // 矩形的四条线
        const rectLines = [
            {start: {x: rect.x, y: rect.y}, end: {x: rect.x + rect.width, y: rect.y}},
            {start: {x: rect.x + rect.width, y: rect.y}, end: {x: rect.x + rect.width, y: rect.y + rect.height}},
            {start: {x: rect.x + rect.width, y: rect.y + rect.height}, end: {x: rect.x, y: rect.y + rect.height}},
            {start: {x: rect.x, y: rect.y + rect.height}, end: {x: rect.x, y: rect.y}},
        ]


        const controlLength = distance(start, end)
        log('控制点长度', controlLength)


        // figma的渐变控制点
        const figmaGradientLine = {start, end}
        const gradientPoints = getLinearGradientPoints(rect, theta.degrees).farthestPoints
        // web的渐变控制点
        const gradientLine = orderPoints(figmaGradientLine, gradientPoints)

        log('渐变线', gradientLine)


        const {distances: stops, line} = calculatePerpendicularDistances(
            figmaGradientLine,
            gradientLine,
        )

        const offsets = calculateOffsets(gradientLine, figmaGradientLine)

        const toPercent = (n: number) => (n * 100).toFixed(2) + '%'

        log('颜色 stop', stops)

        const backgroundImage = `linear-gradient(${(theta.add(90).degrees).toFixed(2)}deg, ${colors.map((color, index) => {
            return `${color} ${toPercent(stops[index])}`
            // return color
        }).join(',')})`

        figma.ui.postMessage({
            type: 'callback',
            payload: {
                node: {
                    width: node.width,
                    height: node.height,
                },
                points: [
                    // start,
                    // end,
                    line.start,
                    line.end,
                    // ...gradientPoints
                ],

                controls: {
                  figma: figmaGradientLine,
                    web: gradientLine
                },

                lines: rectLines,
                backgroundImage
            },
        })
    } catch (error) {
        console.log(error)
    }
}
