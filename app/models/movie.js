import DS from 'ember-data';

var Movie = DS.Model.extend({
    title: DS.attr('string'),
    keywords: DS.attr(),
    isGood: DS.attr('boolean')
});

export default Movie;
