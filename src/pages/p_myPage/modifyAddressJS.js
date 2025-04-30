$(document).ready(() => {
    $("#addressFindButton").click(() => {
        new daum.Postcode({
            oncomplete: function (data) {

                console.log(data);

                $("#address").val(data.roadAddress);
            }
        }).open();
    });

    const form = document.querySelector('.needs-validation');

    form.addEventListener('submit', event => {

        event.preventDefault();
        event.stopPropagation();
        console.log(form.checkValidity());

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        console.log($("#address").val());
        if($("#address").val() == "")
        {
            alert("주소 값이 비어있습니다. 주소 찾기 버튼을 통해 주소를 찾아주세요.");
            return;
        }

        console.log( opener.document.querySelector("#addrValue"));

        let address = `${$("#address").val()} ${$("#detailAddress").val()}`;
        opener.document.querySelector("#addrValue").innerHTML = addrEncrypt(address);
        
        modifyAddress(address);
        window.close();
    });
})

