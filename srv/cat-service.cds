using my.bookshop as my from '../db/data-model';

@(requires : 'authenticated-user')
service CatalogService {
    entity Books as projection on my.Books;
    function checkSession() returns String;
}
