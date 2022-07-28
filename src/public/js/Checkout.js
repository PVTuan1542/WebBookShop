
var stripe =Stripe('pk_test_51LDmVuGXrgRUCCVoYLQ7BxcCRSxvK68JnWaDWLE7WOKjW5OCPiruU9YDc5IHxbaFdRVDU0edFTEaHAh7EQo8L7dE00fsf0j98d');
// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
var elements = stripe.elements();

var $form = $('#checkout-form');
console.log($form.find('#charge-error').removeAttr('hidden'));
$form.find('#charge-error').removeAttr('hidden');

$form.submit(function (event) {
    $form.find(button).prop('disabled', true);
    stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val(),
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if (response.error) {
        //sho the errors on  the form
        $form.find('#charge-error').text(response.error.message);
        $form.find('#charge-error').removeAttr('hidden');
        $form.find("button").prop('disabled', false); //re-enable sebmission
    } else {
        //Token was created!
        //Get the token ID:
        var token = response.id;

        //Insert the token into the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        //Submit the form:
        $form.get(0).submit();
    }
}