export function slugify(string) {
    // // console.log string', string)

    const a =
        'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b =
        'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

export function generateId() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
        (
            +c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
        ).toString(16)
    )
}

export function isValidEmail(email) {
    var regex =
        /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (!regex.test(email)) {
        return false
    } else {
        return true
    }
}

export function isValidPhone(str) {
    var regex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
    if (!regex.test(str)) {
        return false
    } else {
        return true
    }
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export function get6RandomChars() {
    var chars = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ]

    var char1 = chars[Math.floor(Math.random() * 36)]
    var char2 = chars[Math.floor(Math.random() * 36)]
    var char3 = chars[Math.floor(Math.random() * 36)]
    var char4 = chars[Math.floor(Math.random() * 36)]
    var char5 = chars[Math.floor(Math.random() * 36)]
    var char6 = chars[Math.floor(Math.random() * 36)]

    return '' + char1 + char2 + char3 + char4 + char5 + char6
}

/**
 * Download a list of files.
 * @author speedplane
 */
export function downloadFiles(files) {
    function download_next(i) {
        if (i >= files.length) {
            return
        }
        const utUrl = 'https://utfs.io/f/'
        const fileUrl = utUrl + files[i].key
        var a = document.createElement('a')
        a.href = fileUrl
        a.target = '_parent'
        // Use a.download if available, it prevents plugins from opening.
        if ('download' in a) {
            a.download = files[i].name
        }
        // Add a to the doc for click to work.
        ;(document.body || document.documentElement).appendChild(a)
        if (a.click) {
            a.click() // The click method is supported by most browsers.
        } else {
            $(a).click() // Backup using jquery
        }
        // Delete the temporary link.
        a.parentNode.removeChild(a)
        // Download the next file with a small timeout. The timeout is necessary
        // for IE, which will otherwise only download the first file.
        setTimeout(function () {
            download_next(i + 1)
        }, 500)
    }
    // Initiate the first download.
    download_next(0)
}
