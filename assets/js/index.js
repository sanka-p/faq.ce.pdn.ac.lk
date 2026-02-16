var collapseState = false;

$( document ).ready(()=>{
    // Expand/Collapse all button functionality
    $('.btn-expand-all').click(function(){
        if(collapseState == false){
            // Expand all
            $('.btn-expand-all').html("SHRINK ALL");
            $('.multi-collapse').collapse({ 'toggle': true }).collapse('show');
            collapseState = true;
        }else{
            // Shrink all
            $('.btn-expand-all').html("EXPAND ALL");
            $('.multi-collapse').collapse({ 'toggle': true }).collapse('hide');
            collapseState = false;
        }
    });

    // Copy to clipboard functionality for code blocks
    $('pre code').each(function() {
        var code = $(this);
        var pre = code.parent();
        
        // Don't add copy button if it already exists
        if (pre.parent().find('.btn-copy-code').length > 0) {
            return;
        }
        
        // Wrap pre in a div if not already wrapped
        if (!pre.parent().hasClass('code-wrapper')) {
            pre.wrap('<div class="code-wrapper position-relative"></div>');
        }
        
        // Create copy button
        var copyButton = $('<button class="btn btn-sm btn-outline-secondary btn-copy-code position-absolute" style="top: 5px; right: 5px;" title="Copy to clipboard">' +
            '<i class="bi bi-clipboard"></i> Copy' +
            '</button>');
        
        // Insert button
        pre.parent().append(copyButton);
        
        // Copy functionality
        copyButton.click(function(e) {
            e.preventDefault();
            var textToCopy = code.text();
            
            // Use modern clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(function() {
                    showCopySuccess(copyButton);
                }).catch(function(err) {
                    console.error('Failed to copy:', err);
                    fallbackCopy(textToCopy, copyButton);
                });
            } else {
                fallbackCopy(textToCopy, copyButton);
            }
        });
    });
});

// Show success message after copying
function showCopySuccess(button) {
    var originalHtml = button.html();
    button.html('<i class="bi bi-check"></i> Copied!');
    button.addClass('btn-success').removeClass('btn-outline-secondary');
    
    setTimeout(function() {
        button.html(originalHtml);
        button.removeClass('btn-success').addClass('btn-outline-secondary');
    }, 2000);
}

// Fallback copy method for older browsers
function fallbackCopy(text, button) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Fallback copy failed:', err);
        button.html('<i class="bi bi-x"></i> Failed');
    }
    
    document.body.removeChild(textArea);
}

