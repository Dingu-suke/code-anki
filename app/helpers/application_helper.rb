module ApplicationHelper
  def toast_class_for(flash_type)
    case flash_type.to_sym
    when :success
      'bg-slate-950 border border-teal-700 text-emerald-400'
    when :error
      'bg-slate-950 border border-red-700 text-red-400'
    else
      'bg-slate-950 border border-blue-700 text-blue-400'
    end
  end
end