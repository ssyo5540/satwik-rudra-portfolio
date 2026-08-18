// Subject cutout using the macOS Vision framework (macOS 14+).
// Usage: cutout <input-image> <output-png>
// Exits 2 if no foreground subject was detected, so callers can fall back.

import Foundation
import Vision
import CoreImage
import AppKit

let args = CommandLine.arguments
guard args.count == 3 else {
    FileHandle.standardError.write("usage: cutout <input> <output.png>\n".data(using: .utf8)!)
    exit(1)
}
let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])

guard FileManager.default.fileExists(atPath: inputURL.path) else {
    FileHandle.standardError.write("input not found: \(inputURL.path)\n".data(using: .utf8)!)
    exit(1)
}

let handler = VNImageRequestHandler(url: inputURL, options: [:])
let request = VNGenerateForegroundInstanceMaskRequest()

do {
    try handler.perform([request])
} catch {
    FileHandle.standardError.write("vision failed: \(error)\n".data(using: .utf8)!)
    exit(2)
}

guard let observation = request.results?.first, !observation.allInstances.isEmpty else {
    FileHandle.standardError.write("no foreground subject detected\n".data(using: .utf8)!)
    exit(2)
}

do {
    let masked = try observation.generateMaskedImage(
        ofInstances: observation.allInstances,
        from: handler,
        croppedToInstancesExtent: false
    )
    let ciImage = CIImage(cvPixelBuffer: masked)
    let context = CIContext()
    guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else { exit(1) }
    try context.writePNGRepresentation(
        of: ciImage,
        to: outputURL,
        format: .RGBA8,
        colorSpace: colorSpace
    )
    print("cutout ok: \(outputURL.path)")
} catch {
    FileHandle.standardError.write("mask apply failed: \(error)\n".data(using: .utf8)!)
    exit(2)
}
