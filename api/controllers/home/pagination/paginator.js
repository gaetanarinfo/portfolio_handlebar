/*
 * Import Module
 ****************/
const pagination = require('pagination') // Pour la pagination des pages

/*
 * Controller
 *************/
<<<<<<< HEAD
module.exports = function(page, perPage, count, prelinks) {

    // Function pour la pagination
    const boostrapPaginator = new pagination.TemplatePaginator({
        prelink: prelinks,
=======
module.exports = function(perPage, page, count) {

    // Function pour la pagination
    const boostrapPaginator = new pagination.TemplatePaginator({
        prelink: '/',
>>>>>>> origin/dev
        current: page,
        rowsPerPage: perPage,
        totalResult: count,
        slashSeparator: false,
        template: function(result) {
            var i, len, prelink;
            var html = '<div class="mt-4"><ul class="pagination justify-content-center mt-1">';
            if (result.pageCount < 2) {
                html += '</ul></div>';
                return html;
            }
            prelink = this.preparePreLink(result.prelink);
            if (result.previous) {
                html += '<li class="page-item"><a class="page-link" href="' + prelink + result.previous + '">' + '<i class="fas fa-angle-left"></i></a></li>';
            }
            if (result.range.length) {
                for (i = 0, len = result.range.length; i < len; i++) {
                    if (result.range[i] === result.current) {
                        html += '<li class="active page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                    } else {
                        html += '<li class="page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                    }
                }
            }
            if (result.next) {
                html += '<li class="page-item"><a class="page-link" href="' + prelink + result.next + '" class="paginator-next">' + '<i class="fas fa-angle-right"></i></a></li>';
            }
            html += '</ul></div>';
            return html;
        }
    });

    // Render de la pagination
    const paginProjet = boostrapPaginator.render()

    return paginProjet

}