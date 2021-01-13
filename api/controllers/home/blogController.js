const Blog = require('../../database/models/articles'),
    Comment = require('../../database/models/comments')

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async(req, res) => {
        const blog = await Blog.find({}).lean(), // Cards Galerie
            numberArticle = blog.length, // Compte le nombre d'article au blog
            comment = await Comment.find({}).sort('-dateCreate').lean()

        var perPage = 6
        var page = req.query.page

        var pagination = require('pagination');

        // Pagination
        var boostrapPaginator = new pagination.TemplatePaginator({
            prelink: '/blog',
            current: page,
            rowsPerPage: 6,
            totalResult: numberArticle,
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
        var pagin = boostrapPaginator.render()

        var page = req.query.page || 1

        Blog.find({}).sort('-dateCreate')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .lean()
            .exec((err, get) => {
                Blog.countDocuments().exec(function(err, count) {
                    if (err) return next(err)
                    res.render('blog', {
                        title: 'Mon blog personnel',
                        pagin,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        blog: get,
                        content: 'Portfolio de Gaëtan Seigneur',
                        comment
                    })

                })
            })
    }

}