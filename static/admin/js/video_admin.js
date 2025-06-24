ADMIN_JS_CONTENT = '''
// static/admin/js/video_admin.js
(function($) {
    $(document).ready(function() {
        // Función para mostrar/ocultar campos según el tipo de contenido
        function toggleFields() {
            var tipoContenido = $('#id_tipo_contenido').val();
            var pdfField = $('.field-archivo_pdf');
            var videoFields = $('.field-archivo_video, .field-url_video');
            
            // Mostrar/ocultar según el tipo
            if (tipoContenido === 'pdf') {
                pdfField.show();
                videoFields.hide();
            } else if (tipoContenido === 'video') {
                pdfField.hide();
                videoFields.show();
            } else if (tipoContenido === 'ambos') {
                pdfField.show();
                videoFields.show();
            }
        }
        
        // Ejecutar al cargar y al cambiar
        toggleFields();
        $('#id_tipo_contenido').change(toggleFields);
        
        // Validación de archivos de video
        $('#id_archivo_video').change(function() {
            var file = this.files[0];
            if (file) {
                var sizeMB = file.size / (1024 * 1024);
                var maxSizeMB = 500;
                
                if (sizeMB > maxSizeMB) {
                    alert('El archivo es demasiado grande (' + sizeMB.toFixed(2) + 'MB). El tamaño máximo permitido es ' + maxSizeMB + 'MB.');
                    $(this).val('');
                    return false;
                }
                
                // Mostrar información del archivo
                var info = 'Archivo seleccionado: ' + file.name + ' (' + sizeMB.toFixed(2) + 'MB)';
                if ($('.video-file-info').length === 0) {
                    $(this).after('<div class="video-file-info" style="color: #27ae60; font-size: 12px; margin-top: 5px;"></div>');
                }
                $('.video-file-info').text(info);
            }
        });
        
        // Advertencia si se intenta usar ambos tipos de video
        $('#id_archivo_video, #id_url_video').change(function() {
            var hasFile = $('#id_archivo_video').val();
            var hasUrl = $('#id_url_video').val();
            
            if (hasFile && hasUrl) {
                if ($('.video-warning').length === 0) {
                    $('.field-url_video').after(
                        '<div class="video-warning" style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; margin: 10px 0; border-radius: 5px;">' +
                        '<strong>⚠️ Advertencia:</strong> Solo puedes usar UN tipo de video. El sistema dará preferencia al archivo local.' +
                        '</div>'
                    );
                }
            } else {
                $('.video-warning').remove();
            }
        });
    });
})(django.jQuery);
'''