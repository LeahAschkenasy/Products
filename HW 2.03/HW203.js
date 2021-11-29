$(() => {

    alert("this page is live!");
    const categories = [];
    let counter = 0;

    function fillTable() {
        $("tbody").empty();
        categories.forEach(category => {
            let { viewProducts, title, description, id, products, productCount, add } = category;

            $("#categories-table").append(`<tr>
<td><button class='btn btn-link view-products' data-category-id='${id}'>View Products</button></td>
<td>${title}</td>
<td>${description}</td>
<td>${products.length}</td>
<td><button data-category-id-add-product='${id}' class = 'btn btn-info add-product'>Add Product</button></td>
</tr>`);

            $("#categories-table").append(`<tr style= 'display: none' id='products-table-${id}'>
<td colspan="5">
    ${getProductsTable(products)}
</td>
</tr>`);
        });
    };

    function getProductsTable(products) {
        const tableRows = products.map(product => `<tr>
<td>${product.title}</td>
<td>${product.description}</td>
<td>${product.price}</td>
</tr>`);

        return `<table class='table table-bordered table-striped'>
<thead>
<tr>
    <th>product title</th>
    <th>product description</th>
    <th>product price</th>
</tr>
</thead>
<tbody>
    ${tableRows.join('')}
</tbody>
</table>`;
    }

    function ClearTextboxes(textbox) {
        textbox.val("");
    };

    $("#add-category").on('click', function () {
        const title = $('#title-textbox').val();
        const description = $('#description-textbox').val();
        counter++;
        categories.push({
            title,
            description,
            id: counter,
            products: []
        });
        console.log(categories);
        fillTable();
        ClearTextboxes($('#title-textbox'));
        ClearTextboxes($('#description-textbox'));

    });

    $("body").on('click', '.btn-link', function () {
        const button = $(this);
        const personId = button.data('person-id');
        $(`#products-table-${personId}`).toggle();
    });

    $("#categories-table").on('click', '.add-product', function () {
        const button = $(this);
        const categoryId = button.data('category-id-add-product');
        const category = categories.find(c => c.id == categoryId);
        $("#modal-product-title").text(category.title);
        ClearTextboxes($('#product-title'));
        ClearTextboxes($('#product-description'));
        ClearTextboxes($('#product-price'));
        $(".modal").modal();
        $(".modal").data('category-id', categoryId);
    });

    $("#save-product").on('click', function () {
        const title = $('#product-title').val();
        const description = $('#product-description').val();
        const price = $('#product-price').val();
        const categoryId = $(".modal").data('category-id');
        const category = categories.find(c => c.id == categoryId);
        category.products.push({
            title,
            description,
            price
        });
        $(".modal").modal('hide');
        fillTable();
    });

    $("#categories-table").on('click', '.view-products', function () {
        const button = $(this);
        const categoryId = button.data('categoryId');
        $(`#products-table-${categoryId}`).toggle();
    });

});
