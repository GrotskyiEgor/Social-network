const modal = document.getElementById('signature_modal')
const canvas = document.getElementById('signature_canvas')
const ctx = canvas.getContext('2d')

let drawing = false

$(document).on('click', '#user_sign_board', function () {
    modal.classList.remove('hidden')
})

document.getElementById('clear_signature').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

document.getElementById('close_signature').addEventListener('click', () => {
    modal.classList.add('hidden')
})

document.getElementById('save_signature').addEventListener('click', async () => {
    const dataURL = canvas.toDataURL('image/png')

    const csrf = document.getElementById('meta_csrf_token').dataset.csrfToken

    const res = await fetch('/settings/save_signature/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf
        },
        body: JSON.stringify({
            image: dataURL
        })
    })

    if (res.ok) {
        location.reload()
    }
})

function resizeCanvas() {
    canvas.width = 500
    canvas.height = 300
}

resizeCanvas()

function getPos(e) {
    const rect = canvas.getBoundingClientRect()
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

canvas.addEventListener('mousedown', () => drawing = true)
canvas.addEventListener('mouseup', () => {
    drawing = false
    ctx.beginPath()
})
canvas.addEventListener('mouseleave', () => drawing = false)

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return

    const pos = getPos(e)

    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#000'

    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
})