var conn;     // �f�[�^�ʐM�pconnection�I�u�W�F�N�g�̕ۑ��p�ϐ� 
 
// SkyWay�̃V�O�i�����O�T�[�o�[�֐ڑ�����  (API�L�[��u��������K�v����j
var peer = new Peer({ key: '84b9898e-da5b-4ed3-bef7-6b854c1dd4e4', debug: 3});
 
// �V�O�i�����O�T�[�o�ւ̐ڑ����m�������Ƃ��ɁA����open�C�x���g���Ă΂��
peer.on('open', function(){
    // ������ID��\������
    // - ������ID��peer�I�u�W�F�N�g��id�v���p�e�B�ɑ��݂���
    // - ����͂���ID���w�肷�邱�ƂŁA�ʐM���J�n���邱�Ƃ��o����
    $('#my-id').text(peer.id);
});
 
// ���肩��f�[�^�ʐM�̐ڑ��v���C�x���g�������ꍇ�A����connection�C�x���g���Ă΂��
// - �n�����connection�I�u�W�F�N�g�𑀍삷�邱�ƂŁA�f�[�^�ʐM���\
peer.on('connection', function(connection){
  �@
    // �f�[�^�ʐM�p�� connection�I�u�W�F�N�g��ۑ����Ă���
    conn = connection;
 
    // �ڑ������������ꍇ�̃C�x���g�̐ݒ�
    conn.on("open", function() {
        // �����ID��\������
        // - �����ID��connection�I�u�W�F�N�g��id�v���p�e�B�ɑ��݂���
        $("#peer-id").text(conn.id);
    });
 
    // ���b�Z�[�W��M�C�x���g�̐ݒ�
    conn.on("data", onRecvMessage);
});
 
// ���b�Z�[�W��M�C�x���g�̐ݒ�
function onRecvMessage(data) {
    // ��ʂɎ�M�������b�Z�[�W��\��
    $("#messages").append($("<p>").text(conn.id + ": " + data).css("font-weight", "bold"));
}
 
// DOM�v�f�̍\�z���I������ꍇ�ɌĂ΂��C�x���g
// - DOM�v�f�Ɍ��т��ݒ�͂��̒��ōs�Ȃ�
$(function() {
 
    // Connect�{�^���N���b�N���̓���
    $("#connect").click(function() {
        // �ڑ����ID���t�H�[������擾����
        var peer_id = $('#peer-id-input').val();
 
        // ����ւ̐ڑ����J�n����
        conn = peer.connect(peer_id);
 
        // �ڑ������������ꍇ�̃C�x���g�̐ݒ�
        conn.on("open", function() {
            // �����ID��\������
            // - �����ID��connection�I�u�W�F�N�g��id�v���p�e�B�ɑ��݂���
            $("#peer-id").text(conn.id);
        });
 
        // ���b�Z�[�W��M�C�x���g�̐ݒ�
        conn.on("data", onRecvMessage);
    });
 
    // Send�{�^���N���b�N���̓���
    $("#send").click(function() {
        // ���M�e�L�X�g�̎擾
        var message = $("#message").val();
 
        // ���M
        conn.send(message);
 
        // �����̉�ʂɕ\��
        $("#messages").append($("<p>").html(peer.id + ": " + message));
 
        // ���M�e�L�X�g�{�b�N�X���N���A
        $("#message").val("");
    });
 
    // Close�{�^���N���b�N���̓���
    $("#close").click(function() {
        conn.close();
    });
});