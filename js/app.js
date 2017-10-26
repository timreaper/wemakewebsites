$(document).ready(function () {
	$('.navbar a[data-hover]').on('mouseover', function () {
		var elem = $('.navbar__' + $(this).data('hover'));
		elem.css('visibility', 'visible');
		elem.animate({
			opacity: 1
		}, 500);
	});

	$('.navbar a[data-hover]').on('mouseleave', function () {
		setTimeout(function () {
			var elem = $('.navbar__' + $(this).data('hover'));
			if ($('.navbar__' + $(this).data('hover') + ':hover').length === 0) {
				elem.animate({
					opacity: 0
				}, 500, function () {
					elem.css('visibility', 'hidden');
				});
			}
		}, 100);
	});

	$('.navbar .hover-toggle').on('mouseleave', function () {
		$(this).animate({
			opacity: 0
		}, 500, function () {
			$(this).css('visibility', 'hidden');
		});
	});

	$('.banner__languages .dropdown-item').on('click', function () {
		$('.banner__languages .dropdown-toggle').html($(this).data('language'));
	});

	$('.navbar__cart__item__details__quantity .decrease').on('click', function () {
		var amount = $(this).parent().find('.amount');
		var amountVal = parseInt(amount.html());
		if (amountVal > 0) {
			amountVal -= 1;
		}
		amount.html(amountVal);
	});

	$('.navbar__cart__item__details__quantity .increase').on('click', function () {
		var amount = $(this).parent().find('.amount');
		var amountVal = parseInt(amount.html()) + 1;
		amount.html(amountVal);
	});

	$('.navbar__cart__item__details__remove').on('click', function () {
		var item = $(this).parent().parent().parent();
		item.animate({
			opacity: 0
		}, 500, function () {
			item.remove();
		});
	});
});