let tableData = []

const updateTable = () => {
	const table = document.getElementById("table-data")
	let html = ``
	let n = 0
	for (const row of tableData) {
		if (row.inView) {
			html += `<tr>`
			html += `<td><a href="${row.link}">${row.name}</a></td>`
			html += `<td>${row.description}</td>`
			html += `<td>${row.trl}</td>`
			html += `<td>${row.tags}</td>`
			html += `</tr>`
			n++
		}
	}
	table.innerHTML = html
	document.getElementById("results").innerHTML = n
}

const initCatalogue = async () => {
	const res = await fetch("./catalogue.csv")
	if (res.ok) {
		const data = await res.text()
		const rows = data.split(/\r?\n/)
		rows.shift()
		for (const row of rows) {
			const els = row.match(/("[^"]*")|[^,]+/g)
			tableData.push({
				name: els[0],
				description: els[2].replace(/["]+/g, ""),
				trl: els[3],
				tags: els[4].replace(/["]+/g, "").replaceAll(",", ", "),
				link: els[1],
				inView: true
			})
		}
	}
	updateTable()
}

const onSearch = () => {
	const searchTerm = searchInput.value
	for (let row of tableData) {
		let flag = true
		if (!row.tags.includes(searchTerm)) {
			flag = false
		}
		if (row.trl < sliderInput.value) {
			flag = false
		}
		if (flag) {
			row.inView = true
		} else {
			row.inView = false
		}
	}
	updateTable()
}


// Start

initCatalogue()

const btn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-term")
const sliderInput = document.getElementById("slider")
sliderInput.value = 1
document.getElementById("trl-value").innerHTML = sliderInput.value

btn.addEventListener("click", onSearch)
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
		onSearch()
    }
})

sliderInput.addEventListener("input", function(_) {
	document.getElementById("trl-value").innerHTML = sliderInput.value
	onSearch()
})
