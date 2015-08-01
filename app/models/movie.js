export default DS.Model.extend({
    title: DS.attr('string'),
    keywords: DS.attr(),
    isGood: DS.attr('boolean')
});