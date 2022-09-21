console.log("Hello World");

let rows = [
	{
		id: 1,
		first: "Machine",
		last: "One",
		handle: "Some URL",
		inView: true
	},
	{
		id: 2,
		first: "Machine",
		last: "Two",
		handle: "Some URL",
		inView: true
	},
	{
		id: 3,
		first: "Machine",
		last: "Three",
		handle: "Some URL",
		inView: true
	},
]

const btn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-term")

const updateTable = () => {

	const table = document.getElementById("table-data")
	console.log(table)

	let html = ``
	for (const row of rows) {
		if (row.inView) {
			html += `<tr>`
			html += `<td>${row.id}</td>`
			html += `<td>${row.first}</td>`
			html += `<td>${row.last}</td>`
			html += `<td>${row.handle}</td>`
			html += `</tr>`
		}
	}
	table.innerHTML = html
}

const onSearch = () => {
	console.log("Search")
	const searchTerm = searchInput.value
	console.log(searchTerm)
	for (let row of rows) {
		const flag = row.last.includes(searchTerm)
		console.log(flag, row)
		if (flag) {
			console.log(row)
			row.inView = true
		} else {
			row.inView = false
		}
	}
	updateTable()
}


// Add listeners
btn.addEventListener("click", onSearch)
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
		onSearch()
    }
})

updateTable();