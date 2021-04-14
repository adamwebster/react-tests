const ColorContrast = () => {
    function hexToRgb(hex: string) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    }

    const color1rgb: any = hexToRgb('#fff');
    const color2rgb: any = hexToRgb('#000');

    function luminance(r: any, g: any, b: any) {
        var a = [r, g, b].map(function (v) {
            v /= 255;
            return v <= 0.03928
                ? v / 12.92
                : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    // calculate the relative luminance
    const color1luminance = luminance(color1rgb.r, color1rgb.g, color1rgb.b);
    const color2luminance = luminance(color2rgb.r, color2rgb.g, color2rgb.b);

    const ratio =
        color1luminance > color2luminance
            ? (color2luminance + 0.05) / (color1luminance + 0.05)
            : (color1luminance + 0.05) / (color2luminance + 0.05);
    const result = `
                AA-level large text: ${ratio < 1 / 3 ? 'PASS' : 'FAIL'}<br>
                AA-level small text: ${ratio < 1 / 4.5 ? 'PASS' : 'FAIL'}<br>
                AAA-level large text: ${ratio < 1 / 4.5 ? 'PASS' : 'FAIL'}<br>
                AAA-level small text: ${ratio < 1 / 7 ? 'PASS' : 'FAIL'}
               `;
    return (
        <>
            Color Contrast
            {result}
        </>
    );
};

export default ColorContrast;
