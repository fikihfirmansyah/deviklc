const App = {
	cursorEl: document.getElementById("cursor"),
	eyeEl: document.getElementById("eye"),
	pupilEl: document.getElementById("pupil"),

	linkEls: document.querySelectorAll("a"),
	currentlyHoveredLinkEl: undefined,

	lastClearTransitionTimeout: undefined,

	pupilElInitBoundings: undefined,
	pupilMaxBoundings: undefined,

	init() {
		this.handleWindowResize()
		this.handleMouseMove()
		this.handleLinksHover()
	},

	handleWindowResize() {
		const onWindowResize = () => {
			this.pupilElInitBoundings = this.pupilEl.getBoundingClientRect()

			this.pupilMaxBoundings = {
				minX: this.pupilElInitBoundings.x - 50,
				maxX: this.pupilElInitBoundings.x + 50,
				minY: this.pupilElInitBoundings.y - 15,
				maxY: this.pupilElInitBoundings.y + 15
			}
		}

		window.addEventListener("resize", onWindowResize)

		onWindowResize()
	},

	handleMouseMove() {
		const onMouseMove = (ev) => {
			const { clientX, clientY } = ev

			const CIRCULAR_POINTER_SIZE = 30

			let newPupilX = undefined
			let newPupilY = undefined

			let newCursorX = undefined
			let newCursorY = undefined

			let newCursorWidth = undefined
			let newCursorHeight = undefined

			let newCursorBorderRadius = undefined

			if (
				this.isPointInRect(
					{
						x1: this.pupilElInitBoundings.x,
						y1: this.pupilElInitBoundings.y,
						x2: this.pupilElInitBoundings.x + this.pupilElInitBoundings.width,
						y2: this.pupilElInitBoundings.y + this.pupilElInitBoundings.height
					},
					{ x: clientX, y: clientY }
				)
			) {
				// Move the pupil to center
				newPupilX = this.pupilElInitBoundings.x
				newPupilY = this.pupilElInitBoundings.y

				const updatedPupilBoundings = this.pupilEl.getBoundingClientRect()

				newCursorX = updatedPupilBoundings.x + updatedPupilBoundings.width / 2
				newCursorY = updatedPupilBoundings.y + updatedPupilBoundings.height / 2

				newCursorWidth = CIRCULAR_POINTER_SIZE
				newCursorHeight = CIRCULAR_POINTER_SIZE

				newCursorBorderRadius = "50%"
			} else if (this.currentlyHoveredLinkEl) {
				const currentlyHoveredLinkBoundings =
					this.currentlyHoveredLinkEl.getBoundingClientRect()

				newCursorX = currentlyHoveredLinkBoundings.x + 14
				newCursorY = currentlyHoveredLinkBoundings.y + 16

				newCursorWidth = currentlyHoveredLinkBoundings.width + 2
				newCursorHeight = currentlyHoveredLinkBoundings.height

				newCursorBorderRadius = "0"
			} else {
				const degrees = this.calculateDegreesBetweenEyeAndPointer(
					clientX,
					clientY,
					this.pupilElInitBoundings.x + this.pupilElInitBoundings.width / 2,
					this.pupilElInitBoundings.y + this.pupilElInitBoundings.height / 2
				)

				const newCoords = this.moveByDegrees(
					100,
					degrees,
					this.pupilElInitBoundings.x + this.pupilElInitBoundings.width / 2,
					this.pupilElInitBoundings.y + this.pupilElInitBoundings.height / 2
				)

				newPupilX = newCoords.x
				newPupilY = newCoords.y

				if (newPupilX > this.pupilMaxBoundings.maxX) {
					newPupilX = this.pupilMaxBoundings.maxX
				} else if (newPupilX < this.pupilMaxBoundings.minX) {
					newPupilX = this.pupilMaxBoundings.minX
				}

				if (newPupilY > this.pupilMaxBoundings.maxY) {
					newPupilY = this.pupilMaxBoundings.maxY
				} else if (newPupilY < this.pupilMaxBoundings.minY) {
					newPupilY = this.pupilMaxBoundings.minY
				}

				newCursorX = clientX
				newCursorY = clientY

				newCursorWidth = CIRCULAR_POINTER_SIZE
				newCursorHeight = CIRCULAR_POINTER_SIZE

				newCursorBorderRadius = "50%"
			}

			this.pupilEl.style.transform = `translate(
                ${this.pupilElInitBoundings.x - newPupilX}px,
                ${this.pupilElInitBoundings.y - newPupilY}px
            )`

			if (newCursorWidth + "px" !== this.cursorEl.style.width) {
				this.cursorEl.style.transition = "0.110s all"

				clearTimeout(this.lastClearTransitionTimeout)
				this.lastClearTransitionTimeout = undefined
			} else {
				if (!this.lastClearTransitionTimeout) {
					this.lastClearTransitionTimeout = setTimeout(() => {
						this.cursorEl.style.transition = "none"

						this.lastClearTransitionTimeout = undefined
					}, 110)
				}
			}

			this.cursorEl.style.opacity = "1"
			this.cursorEl.style.transform = `translate(
				${newCursorX}px,
				${newCursorY}px
			)`
			this.cursorEl.style.width = newCursorWidth + "px"
			this.cursorEl.style.height = newCursorHeight + "px"
			this.cursorEl.style.borderRadius = newCursorBorderRadius
		}

		window.addEventListener("mousemove", (ev) => {
			requestAnimationFrame(() => onMouseMove(ev))
		})
	},

	handleLinksHover() {
		this.linkEls.forEach((linkEl) => {
			linkEl.onmouseover = () => {
				this.currentlyHoveredLinkEl = linkEl
			}

			linkEl.onmouseout = () => {
				if (this.currentlyHoveredLinkEl == linkEl) {
					this.currentlyHoveredLinkEl = undefined
				}
			}
		})
	},

	isPointInRect({ x1, y1, x2, y2 }, { x, y }) {
		return x > x1 && x < x2 && y > y1 && y < y2
	},

	calculateDegreesBetweenEyeAndPointer(cursorX, cursorY, pupilX, pupilY) {
		return (Math.atan2(pupilY - cursorY, pupilX - cursorX) * 180) / Math.PI
	},

	moveByDegrees(distance, angle, x, y) {
		const rad = (angle * Math.PI) / 180
		const newX = x + Math.cos(rad) * distance
		const newY = y + Math.sin(rad) * distance

		return {
			x: newX,
			y: newY
		}
	}
}

App.init()
